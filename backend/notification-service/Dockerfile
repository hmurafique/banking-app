# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY src/ ./src

# Expose port (FastAPI/Flask, adjust if needed)
EXPOSE 4004

# Run the app
CMD ["python", "src/main.py"]

