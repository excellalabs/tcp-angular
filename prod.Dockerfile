FROM duluca/minimal-node-web-server:lts-alpine
WORKDIR /usr/src/app
USER root
RUN chown -R node:node public
USER node
COPY --chown=node:node dist/tcp-angular public
COPY --chown=node:node configure-and-run .
CMD ["/usr/src/app/configure-and-run"]
