# this will download a new version of Chromium only when a new version of the Playwright image is released. It won't download it on every build.
FROM mcr.microsoft.com/playwright:v1.54.2

# Set working directory
WORKDIR /usr/src/app