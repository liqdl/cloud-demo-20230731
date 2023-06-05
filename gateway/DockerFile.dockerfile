# 指定基础镜像	
FROM openjdk:17-alpine	
# 维护者信息	
MAINTAINER liqdl	
# 定义匿名卷	
VOLUME /tmp	
#复制文件或修改名称	
ADD ./target/gateway-0.0.1.jar /app.jar	
# 允许指定的端口	
EXPOSE 10010	
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]	
