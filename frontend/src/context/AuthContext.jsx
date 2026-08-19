import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import storageService from '../services/storageService';
import supabaseService from '../services/supabaseService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!storageService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Check local session
    const localUser = storageService.getCurrentUser();
    if (localUser) {
      setCurrentUser(localUser);
      setIsAuthenticated(true);
    }

    // 2. Listen to Supabase Auth State changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const cloudProfile = await supabaseService.fetchUserProfile(session.user.id);
        const user = cloudProfile || {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || 'Engineering Student',
          role: session.user.user_metadata?.role || 'student'
        };
        storageService.saveCurrentUser(user);
        storageService.updateUser(user);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (emailOrUsername, password) => {
    setLoading(true);
    const rawIdentifier = (emailOrUsername || '').trim();

    // 1. Direct Supabase Database Sign In with strict casing
    const res = await supabaseService.signIn(rawIdentifier, password);
    if (!res || !res.success) {
      setLoading(false);
      return res || { success: false, error: 'Authentication failed. Please verify your credentials and password.' };
    }

    // Save authenticated user session
    storageService.saveCurrentUser(res.user);
    storageService.updateUser(res.user);
    setCurrentUser(res.user);
    setIsAuthenticated(true);
    setLoading(false);
    return { success: true, user: res.user };
  };

  const loginAsAdmin = () => {
    return login('admin', 'admin123');
  };

  const register = async (formData) => {
    setLoading(true);
    const cleanEmail = (formData.email || '').toLowerCase().trim();

    if (!cleanEmail) {
      setLoading(false);
      return { success: false, error: 'Email address is required.' };
    }

    // Disallow admin email registration
    if (cleanEmail === 'admin' || cleanEmail === 'admin@careerpilot.ai') {
      setLoading(false);
      return { success: false, error: 'This identifier is reserved for System Administration.' };
    }

    // Supabase Registration
    const res = await supabaseService.signUp(cleanEmail, formData.password, formData);
    if (!res || !res.success) {
      setLoading(false);
      return res || { success: false, error: 'Registration failed. Please check your details.' };
    }

    const newUser = {
      ...res.user,
      password: formData.password,
      isNewUser: true,
      assessmentDone: false
    };

    // Save to session and initialize baseline
    storageService.addUser(newUser);
    storageService.saveCurrentUser(newUser);
    storageService.saveUserSkills({}, newUser.id);
    await supabaseService.saveUserSkills(newUser.id, {});

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setLoading(false);
    return { success: true, user: newUser };
  };

  const updateProfile = async (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields };
    storageService.saveCurrentUser(updated);
    storageService.updateUser(updated);
    await supabaseService.saveUserProfile(updated);
    setCurrentUser(updated);
    return updated;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase sign out note:', e);
    }
    storageService.clearCurrentUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isAdmin,
      loading,
      login,
      loginAsAdmin,
      register,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
