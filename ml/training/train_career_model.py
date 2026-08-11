"""
Train Career Recommendation Random Forest Classifier
Evaluates Accuracy, Precision, Recall, F1-Score, and Confusion Matrix.
Serializes trained model to ml/models/career_rf_model.pkl.
"""

import os
import pickle
import numpy as np

def generate_balanced_dataset(n_samples_per_class=250):
    np.random.seed(42)
    classes = ['ML Engineer', 'Data Scientist', 'Cloud Architect', 'Full Stack Dev', 'DevOps/SRE']
    n_classes = len(classes)
    
    # 13 Features: [Python, ML_Core, PyTorch, ScikitLearn, DeepLearning, React, Node, AWS, Docker, Sec, Algorithms, Degree_Level, Experience_Years]
    X_list = []
    y_list = []
    
    for c_idx in range(n_classes):
        for _ in range(n_samples_per_class):
            # Base features (20-60)
            feat = np.random.randint(25, 65, size=13)
            
            # Domain-specific skill boosts
            if c_idx == 0: # ML Engineer
                feat[0] = np.random.randint(80, 98) # Python
                feat[1] = np.random.randint(75, 95) # ML_Core
                feat[2] = np.random.randint(70, 92) # PyTorch
                feat[3] = np.random.randint(75, 95) # ScikitLearn
                feat[4] = np.random.randint(70, 90) # DeepLearning
            elif c_idx == 1: # Data Scientist
                feat[0] = np.random.randint(75, 95) # Python
                feat[1] = np.random.randint(80, 95) # ML_Core
                feat[3] = np.random.randint(75, 95) # ScikitLearn
                feat[10] = np.random.randint(70, 90) # Algorithms
            elif c_idx == 2: # Cloud Architect
                feat[7] = np.random.randint(85, 98) # AWS
                feat[8] = np.random.randint(80, 95) # Docker
                feat[9] = np.random.randint(75, 92) # Security
                feat[11] = np.random.randint(75, 95) # Degree
                feat[12] = np.random.randint(3, 8) # Experience
            elif c_idx == 3: # Full Stack Dev
                feat[5] = np.random.randint(80, 98) # React
                feat[6] = np.random.randint(75, 95) # Node
                feat[0] = np.random.randint(65, 85) # Python
                feat[10] = np.random.randint(70, 90) # Algorithms
            elif c_idx == 4: # DevOps/SRE
                feat[8] = np.random.randint(85, 98) # Docker
                feat[7] = np.random.randint(80, 95) # AWS
                feat[9] = np.random.randint(75, 92) # Security
                feat[0] = np.random.randint(60, 80) # Python
                
            X_list.append(feat)
            y_list.append(c_idx)
            
    X = np.array(X_list)
    y = np.array(y_list)
    
    # Shuffle
    indices = np.arange(len(X))
    np.random.shuffle(indices)
    return X[indices], y[indices]

def train():
    print("=================================================================")
    print("   ML Module 4: Career Recommendation Random Forest Model")
    print("=================================================================")
    X, y = generate_balanced_dataset()
    
    split_idx = int(0.8 * len(X))
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]
    
    classes = ['ML Engineer', 'Data Scientist', 'Cloud Architect', 'Full Stack Dev', 'DevOps/SRE']
    
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
    
    rf = RandomForestClassifier(n_estimators=150, max_depth=12, random_state=42)
    rf.fit(X_train, y_train)
    y_pred = rf.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred)
    print(f"\n[+] Model Training Complete!")
    print(f"[+] Overall Test Accuracy: {acc * 100:.2f}%\n")
    
    labels = list(range(len(classes)))
    print("Classification Report:")
    print(classification_report(y_test, y_pred, labels=labels, target_names=classes, zero_division=0))
    
    cm = confusion_matrix(y_test, y_pred, labels=labels)
    print("\nConfusion Matrix (5x5):")
    print(cm)
    
    os.makedirs(os.path.join("ml", "models"), exist_ok=True)
    model_path = os.path.join("ml", "models", "career_rf_model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(rf, f)
    print(f"\n[SUCCESS] Serialized model saved to: {model_path}\n")

if __name__ == '__main__':
    train()
