#!/bin/bash

# Futuristic Portfolio Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_NAME="futuristic-portfolio"
CONTAINER_NAME="portfolio-container"
PORT=${PORT:-8080}

# Functions
print_usage() {
    echo -e "${BLUE}Usage:${NC}"
    echo "  ./docker-start.sh [COMMAND]"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  build     - Build the production Docker image"
    echo "  build-dev - Build the development Docker image"
    echo "  run       - Run the container in production mode"
    echo "  dev       - Run the container in development mode (auto-builds if needed)"
    echo "  stop      - Stop and remove the container"
    echo "  logs      - Show container logs"
    echo "  clean     - Remove container and image"
    echo "  help      - Show this help message"
    echo ""
    echo -e "${BLUE}Environment Variables:${NC}"
    echo "  PORT      - Port to run the container on (default: 8080)"
    echo ""
    echo -e "${BLUE}Examples:${NC}"
    echo "  ./docker-start.sh dev          # Start development (rebuilds only if needed)"
    echo "  ./docker-start.sh build-dev    # Force rebuild development image"
    echo "  ./docker-start.sh run          # Production mode"
    echo "  PORT=3000 ./docker-start.sh run"
    echo ""
    echo -e "${BLUE}Development Notes:${NC}"
    echo "  • Code changes auto-reload in dev mode (no rebuild needed)"
    echo "  • Only rebuild dev if package.json or Dockerfile.dev changes"
    echo "  • Production always rebuilds for latest changes"
}

build_image() {
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker build -t "$PROJECT_NAME" .
    echo -e "${GREEN}✓ Image built successfully${NC}"
}

build_dev() {
    echo -e "${YELLOW}Building development Docker image...${NC}"
    docker build -f Dockerfile.dev -t "${PROJECT_NAME}-dev" .
    echo -e "${GREEN}✓ Development image built successfully${NC}"
}

run_production() {
    echo -e "${YELLOW}Starting container in production mode on port $PORT...${NC}"
    
    # Stop existing container if running
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    
    # Run new container
    docker run -d \
        --name "$CONTAINER_NAME" \
        -p "$PORT:80" \
        --restart unless-stopped \
        "$PROJECT_NAME"
    
    echo -e "${GREEN}✓ Container started successfully${NC}"
    echo -e "${BLUE}Portfolio available at: http://localhost:$PORT${NC}"
    echo -e "${BLUE}Health check: http://localhost:$PORT/health${NC}"
}

run_development() {
    echo -e "${YELLOW}Starting container in development mode...${NC}"
    
    # Check if dev image exists, build if not
    if ! docker image inspect "${PROJECT_NAME}-dev" >/dev/null 2>&1; then
        echo -e "${YELLOW}Building development image...${NC}"
        docker build -f Dockerfile.dev -t "${PROJECT_NAME}-dev" .
        echo -e "${GREEN}✓ Development image built${NC}"
    fi
    
    # Stop existing container if running
    docker stop "${CONTAINER_NAME}-dev" 2>/dev/null || true
    docker rm "${CONTAINER_NAME}-dev" 2>/dev/null || true
    
    # Run development container
    docker run -d \
        --name "${CONTAINER_NAME}-dev" \
        -p 5173:5173 \
        -v "$(pwd):/app" \
        -v /app/node_modules \
        -e NODE_ENV=development \
        -e VITE_HOST=0.0.0.0 \
        --restart unless-stopped \
        "${PROJECT_NAME}-dev"
    
    echo -e "${GREEN}✓ Development container started${NC}"
    echo -e "${BLUE}Development server: http://localhost:5173${NC}"
    echo -e "${BLUE}💡 Tip: Code changes will reload automatically!${NC}"
    echo -e "${BLUE}💡 Only rebuild if you change package.json or Dockerfile.dev${NC}"
}

stop_container() {
    echo -e "${YELLOW}Stopping containers...${NC}"
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker stop "${CONTAINER_NAME}-dev" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "${CONTAINER_NAME}-dev" 2>/dev/null || true
    echo -e "${GREEN}✓ Containers stopped${NC}"
}

show_logs() {
    echo -e "${YELLOW}Container logs:${NC}"
    docker logs -f "$CONTAINER_NAME" 2>/dev/null || docker logs -f "${CONTAINER_NAME}-dev" 2>/dev/null || echo -e "${RED}No running containers found${NC}"
}

clean_all() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    stop_container
    docker rmi "$PROJECT_NAME" 2>/dev/null || true
    docker rmi "${PROJECT_NAME}-dev" 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

# Main script logic
case "${1:-help}" in
    "build")
        build_image
        ;;
    "build-dev")
        build_dev
        ;;
    "run")
        build_image
        run_production
        ;;
    "dev")
        run_development
        ;;
    "stop")
        stop_container
        ;;
    "logs")
        show_logs
        ;;
    "clean")
        clean_all
        ;;
    "help"|*)
        print_usage
        ;;
esac
