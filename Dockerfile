FROM amazon/aws-lambda-python:3.11

# Install necessary packages including AWS CLI
RUN yum -y install zip aws-cli

RUN python3 -m pip install --no-cache-dir --ignore-installed pipenv pandas markdown

WORKDIR /var/task

# Begin the functions compiling
COPY Pipfile Pipfile.lock /var/task/
RUN mkdir -p /var/task/functions
RUN mkdir -p /var/task/functions/pages/build
RUN mkdir -p /var/task/functions/content
RUN mkdir -p /var/task/functions/js-css
RUN mkdir -p /var/task/functions/img
RUN mkdir -p /var/task/functions/data
RUN mkdir -p /var/task/learning_tree
RUN pipenv requirements > requirements.txt

# Install dependencies directly into the app directory
# RUN pip install --target=/var/task/functions/app -r requirements.txt
RUN pip install --target=/var/task/functions -r requirements.txt

# Copy local contents of app into the functions/app directory
COPY ./app /var/task/functions/

# Copy non-built HTML stuff
COPY ./about_points.html /var/task/functions/
COPY ./about_achievements.html /var/task/functions/
COPY ./map.html /var/task/functions/

# Copy the contents of the local pages/build folder to functions/pages/build
COPY ./pages/build /var/task/functions/pages/build/

# Copy the contents of the local content folder to functions/content
COPY ./content /var/task/functions/content/

# Copy the contents of the local js/css folder to functions/js-css
COPY ./js-css /var/task/functions/js-css/

# Copy the contents of the local img folder to functions/img
COPY ./img /var/task/functions/img/

# Copy the contents of the local img folder to functions/img
COPY ./data /var/task/functions/data/

# Copy the contents of the local learning-tree folder to functions/learning-tree
COPY ./learning_tree /var/task/functions/learning_tree/

# Copy the python builder code and build the base website
RUN mkdir -p /var/task/functions/py
COPY ./py /var/task/functions/py
WORKDIR /var/task/functions
RUN python3 /var/task/functions/py/build.py
WORKDIR /var/task

# Delete the python builder code
RUN rm -rf /var/task/functions/py

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
