# Use an official RabbitMQ runtime as a parent image
FROM rabbitmq:3.7.6

# Setting the workdir
WORKDIR /app

# ENV Variables
ENV RABBITMQ_NODENAME test-node
ENV RABBITMQ_DEFAULT_USER=user 
ENV RABBITMQ_DEFAULT_PASS=password
#docker logs -f container_id
ENV RABBITMQ_LOG_BASE=/var/log/rabbitmq

# Add plugin
RUN rabbitmq-plugins enable --offline rabbitmq_management

# Make ports available to the world outside this container
EXPOSE 4359 5671 5672 15671 15672 25672
