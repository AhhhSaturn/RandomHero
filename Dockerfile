FROM oven/bun

COPY . .
RUN [ "bun", "install", "--frozen-lockfile", "--production" ]

USER bun
RUN [ "bun", "run", "registerCommands.ts" ]
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
