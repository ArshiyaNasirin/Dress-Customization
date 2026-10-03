import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
data = {
    'Size': [800, 1000, 1200, 1500, 1800, 2000],
    'Price': [150, 200, 250, 300, 350, 400]
}
df = pd.DataFrame(data)

# Define the independent variable (X) and dependent variable (y)
X = df[['Size']]
y = df['Price']
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Linear Regression model
model = LinearRegression()
# Fit the model to the training data
model.fit(X_train, y_train)
# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r_squared = r2_score(y_test, y_pred)
print(f'Mean Squared Error: {mse:.2f}')
print(f'R-squared: {r_squared:.2f}')

# Plot the results
plt.figure(figsize=(10, 6))
plt.scatter(X, y, color='blue', label='Actual Prices')
plt.plot(X, model.predict(X), color='red', label='Regression Line')
plt.title('Simple Linear Regression: House Price Prediction')
plt.xlabel('Size (sq ft)')
plt.ylabel('Price ($1000)')
plt.legend()
plt.show()
