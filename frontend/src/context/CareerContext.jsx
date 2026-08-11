import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import storageService from '../services/storageService';
import supabaseService from '../services/supabaseService';
import MLEngine from '../services/mlEngine';
import { useAuth } from './AuthContext';

const CareerContext = createContext();

export const CareerProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [careers, setCareers] = useState(() => storageService.getCareers());
  const [skillsList, setSkillsList] = useState(() => storageService.getSkills());
  const [userSkills, setUserSkills] = useState(() => storageService.getUserSkills(currentUser?.id));
  
  // Selected Target Career
  const [targetCareerId, setTargetCareerId] = useState(() => {
    return currentUser?.targetCareerId || 'car_mle';
  });

  // Sync user skills whenever current user changes (stable and persistent)
  useEffect(() => {
    const localSkills = storageService.getUserSkills(currentUser?.id);
    setUserSkills(localSkills);
    if (currentUser?.targetCareerId) {
      setTargetCareerId(currentUser.targetCareerId);
    }

    // Background cloud fetch from Supabase (only merges if non-empty and different)
    if (currentUser?.id && !currentUser.id.includes('admin')) {
      supabaseService.fetchUserSkills(currentUser.id).then(cloudSkills => {
        if (cloudSkills && Object.keys(cloudSkills).length > 0) {
          const isDifferent = JSON.stringify(cloudSkills) !== JSON.stringify(localSkills);
          if (isDifferent) {
            const merged = { ...localSkills, ...cloudSkills };
            storageService.saveUserSkills(merged, currentUser.id);
            setUserSkills(merged);
          }
        }
      }).catch(err => {
        console.warn('Supabase cloud skills sync fallback:', err);
      });
    }
  }, [currentUser?.id, currentUser?.targetCareerId]);

  const selectedCareer = useMemo(() => {
    return careers.find(c => c.id === targetCareerId) || careers[0];
  }, [careers, targetCareerId]);

  // Dynamic ML Calculations (Strictly deterministic)
  const gapAnalysis = useMemo(() => {
    return MLEngine.analyzeSkillGap(userSkills, selectedCareer);
  }, [userSkills, selectedCareer]);

  const careerRecommendations = useMemo(() => {
    return MLEngine.recommendCareers(userSkills, currentUser);
  }, [userSkills, currentUser]);

  const explainabilityData = useMemo(() => {
    return MLEngine.generateExplainability(userSkills, selectedCareer);
  }, [userSkills, selectedCareer]);

  const [roadmap, setRoadmap] = useState(() => {
    const saved = storageService.getRoadmapProgress(targetCareerId);
    return saved || MLEngine.generateRoadmap(userSkills, selectedCareer);
  });

  // Re-generate roadmap when target career changes
  useEffect(() => {
    const saved = storageService.getRoadmapProgress(targetCareerId);
    if (saved) {
      setRoadmap(saved);
    } else {
      const generated = MLEngine.generateRoadmap(userSkills, selectedCareer);
      setRoadmap(generated);
      storageService.saveRoadmapProgress(targetCareerId, generated);
    }
  }, [targetCareerId, selectedCareer, userSkills]);

  // Skill updates with Supabase Cloud Sync & Local Storage Isolation
  const updateSkillLevel = (skillId, newLevel) => {
    const updated = { ...userSkills, [skillId]: Math.min(100, Math.max(0, newLevel)) };
    storageService.saveUserSkills(updated, currentUser?.id);
    setUserSkills(updated);
    if (currentUser?.id) {
      supabaseService.saveUserSkills(currentUser.id, updated);
      supabaseService.recordAssessment(currentUser.id, skillId, newLevel);
    }
  };

  const updateBatchSkills = (newSkillsMap) => {
    const updated = { ...userSkills, ...newSkillsMap };
    storageService.saveUserSkills(updated, currentUser?.id);
    setUserSkills(updated);
    if (currentUser?.id) {
      supabaseService.saveUserSkills(currentUser.id, updated);
    }
  };

  const resetSkills = () => {
    storageService.saveUserSkills({}, currentUser?.id);
    setUserSkills({});
    if (currentUser?.id) {
      supabaseService.saveUserSkills(currentUser.id, {});
    }
  };

  // Toggle Roadmap Item Completion
  const toggleRoadmapItem = (phaseIndex, itemId) => {
    if (!roadmap || !roadmap.phases) return;

    const newPhases = [...roadmap.phases];
    const targetPhase = newPhases[phaseIndex];
    if (!targetPhase) return;

    const targetItem = targetPhase.items.find(i => i.id === itemId);
    if (targetItem) {
      targetItem.isCompleted = !targetItem.isCompleted;
      
      const total = newPhases.reduce((acc, p) => acc + p.items.length, 0);
      const completed = newPhases.reduce((acc, p) => acc + p.items.filter(i => i.isCompleted).length, 0);
      const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

      const updatedRoadmap = {
        ...roadmap,
        phases: newPhases,
        completedItems: completed,
        totalItems: total,
        progressPercent
      };

      setRoadmap(updatedRoadmap);
      storageService.saveRoadmapProgress(targetCareerId, updatedRoadmap);
      if (currentUser?.id) {
        supabaseService.saveRoadmapProgress(currentUser.id, targetCareerId, updatedRoadmap);
        const updatedUser = { ...currentUser, roadmapProgress: progressPercent };
        storageService.updateUser(updatedUser);
      }
    }
  };

  // Switch Target Career
  const selectCareer = (careerId) => {
    setTargetCareerId(careerId);
    if (currentUser?.id) {
      const careerObj = careers.find(c => c.id === careerId);
      const updatedUser = { 
        ...currentUser, 
        targetCareerId: careerId, 
        targetCareerTitle: careerObj?.title || 'Machine Learning Engineer' 
      };
      storageService.saveCurrentUser(updatedUser);
      storageService.updateUser(updatedUser);
      supabaseService.saveUserProfile(updatedUser);
    }
  };

  return (
    <CareerContext.Provider value={{
      careers,
      skillsList,
      userSkills,
      targetCareerId,
      selectedCareer,
      gapAnalysis,
      careerRecommendations,
      explainabilityData,
      roadmap,
      selectCareer,
      updateSkillLevel,
      updateBatchSkills,
      resetSkills,
      toggleRoadmapItem
    }}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => useContext(CareerContext);
export default CareerContext;
