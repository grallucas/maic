FROM amazon/aws-lambda-python:3.11

# Install AWS CLI
RUN yum -y install aws-cli

WORKDIR /var/task

# Copy the contents of the local img folder to /var/task/img
COPY ./img /var/task/img

# Set environment variables for AWS credentials and bucket name
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=us-east-1
ENV S3_BUCKET_NAME=maic-fastapi-lambda
ENV LAMBDA_FUNCTION_NAME=msoe-maic-fastapi

# Sync the images to the S3 bucket
RUN aws s3 sync /var/task/functions/img s3://$S3_BUCKET_NAME/img --delete

# Sync the data to the S3 bucket
RUN aws s3 sync /var/task/functions/data s3://$S3_BUCKET_NAME/data

# Delete the imgs and data to prevent duplicates code
RUN rm -rf /var/task/functions/img
RUN rm -rf /var/task/functions/data

# Zip the contents of the functions directory
RUN cd /var/task/functions && zip -r /var/task/functions.zip .

# Copy the zip file to an S3 bucket
RUN aws s3 cp /var/task/functions.zip s3://$S3_BUCKET_NAME/

# Update Lambda
RUN aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --s3-bucket $S3_BUCKET_NAME --s3-key functions.zip

CMD ["sh"]
