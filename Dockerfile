#FROM jdk-17 # for java 17
FROM openjdk:17-jdk

WORKDIR /app

COPY target/*.jar app/info-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app/info-0.0.1-SNAPSHOT.jar"]