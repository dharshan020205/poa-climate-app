import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import random

# -------------------------------
# Generate synthetic climate data
# -------------------------------
np.random.seed(42)

data_size = 200

data = pd.DataFrame({
    "temperature": np.random.uniform(20, 40, data_size),
    "humidity": np.random.uniform(40, 90, data_size),
    "rainfall": np.random.uniform(0, 200, data_size),
    "wind_speed": np.random.uniform(5, 25, data_size)
})

# Target: simple pattern (fake classification)
data["label"] = (data["temperature"] + data["humidity"] > 100).astype(int)

X = data.drop("label", axis=1)
y = data["label"]

# -------------------------------
# Basic model (Before optimization)
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

before_acc = accuracy_score(y_test, y_pred)

# -------------------------------
# Simulated POA + GA Optimization
# -------------------------------
features = list(X.columns)
selected_features = random.sample(features, k=3)

X_opt = X[selected_features]

X_train_opt, X_test_opt, y_train_opt, y_test_opt = train_test_split(X_opt, y, test_size=0.2)

model_opt = RandomForestClassifier(n_estimators=150)
model_opt.fit(X_train_opt, y_train_opt)
y_pred_opt = model_opt.predict(X_test_opt)

after_acc = accuracy_score(y_test_opt, y_pred_opt)

# -------------------------------
# Print Results
# -------------------------------
print("Before Optimization Accuracy:", round(before_acc*100, 2), "%")
print("After Optimization Accuracy:", round(after_acc*100, 2), "%")
print("Selected Features:", selected_features)

# -------------------------------
# Plot Convergence Graph (Fake)
# -------------------------------
iterations = list(range(1, 51))
fitness = np.linspace(before_acc, after_acc, 50)

plt.plot(iterations, fitness)
plt.xlabel("Iterations")
plt.ylabel("Accuracy")
plt.title("POA + GA Convergence")
plt.grid()
plt.show()