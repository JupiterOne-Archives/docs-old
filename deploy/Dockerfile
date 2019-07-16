FROM 268841479198.dkr.ecr.us-east-1.amazonaws.com/base-deploy

ENV LIFEOMIC_DEPLOY_DIR=/opt/lifeomic/deploy

COPY .npmrc deploy ${LIFEOMIC_DEPLOY_DIR}/

RUN cd $LIFEOMIC_DEPLOY_DIR && \
    yarn install --cache-folder .ycache && \
    rm -rf .ycache .npmrc
