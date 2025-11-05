#FROM jdk-17 # for java 17
// Source - https://stackoverflow.com/questions/69525199/openjdk-java-17-docker-image
// Posted by belem
// Retrieved 05/11/2025, License - CC-BY-SA 4.0

FROM openjdk:17-alpine

WORKDIR /app

COPY target/*.jar app/info-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app/info-0.0.1-SNAPSHOT.jar"]
