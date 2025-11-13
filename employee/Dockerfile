# Step 1: Use an official JDK image
FROM eclipse-temurin:17-jdk

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy the jar file
COPY target/*.jar app.jar

# Step 4: Expose the application port
EXPOSE 8080

# Step 5: Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
