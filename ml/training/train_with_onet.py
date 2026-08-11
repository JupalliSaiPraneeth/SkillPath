"""
Train Random Forest Classifier using O*NET 30.3 Technology Competencies
Evaluates Accuracy, Precision, Recall, F1-Score, and Confusion Matrix.
Serializes model to ml/models/career_rf_model.pkl.
"""

import os
import sys
import pickle
import numpy as np

# Ensure parent directory is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.preprocessing.onet_loader import build_training_dataset

def train_onet_model():
    print("=================================================================")
    print("   Training Random Forest Model on O*NET 30.3 Dataset")
    print("=================================================================")
    
    X, y, feature_names, class_names = build_training_dataset()
    print(f"[+] Total O*NET Samples: {len(X)}")
    print(f"[+] Total Features: {len(feature_names)} skills")
    print(f"[+] Classes: {class_names}")
    
    split_idx = int(0.8 * len(X))
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]
    
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
    
    rf = RandomForestClassifier(n_estimators=150, max_depth=14, min_samples_split=3, random_state=42)
    rf.fit(X_train, y_train)
    y_pred = rf.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred)
    print(f"\n[+] O*NET 30.3 Training Complete!")
    print(f"[+] Test Accuracy: {acc * 100:.2f}%\n")
    
    labels = list(range(len(class_names)))
    print("Classification Report:")
    print(classification_report(y_test, y_pred, labels=labels, target_names=class_names, zero_division=0))
    
    cm = confusion_matrix(y_test, y_pred, labels=labels)
    print("\nConfusion Matrix (5x5):")
    print(cm)
    
    os.makedirs(os.path.join("ml", "models"), exist_ok=True)
    model_path = os.path.join("ml", "models", "career_rf_model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(rf, f)
    print(f"\n[SUCCESS] O*NET 30.3 Model serialized to: {model_path}\n")

if __name__ == '__main__':
    train_onet_model()
