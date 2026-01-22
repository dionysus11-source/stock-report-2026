import subprocess
import os
import sys
import time

# Add root to sys.path to import config
root_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(root_dir)
try:
    import config
except ImportError:
    config = None

def main():
    backend_script = os.path.join(root_dir, "webapp", "backend", "main.py")
    frontend_dir = os.path.join(root_dir, "webapp", "frontend")

    # Get settings from config or defaults
    web_host = config.WEB_HOST if config else "0.0.0.0"
    backend_port = config.BACKEND_PORT if config else 3001
    frontend_port = config.FRONTEND_PORT if config else 3000

    print(f"Starting Backend from {backend_script} on port {backend_port}...")
    # Start backend
    backend = subprocess.Popen([sys.executable, backend_script], cwd=root_dir)
    
    # Wait for backend to initialize
    print("Waiting for backend to stabilize (3s)...")
    time.sleep(3)

    print(f"Starting Frontend from {frontend_dir} on {web_host}:{frontend_port}...")
    # Start frontend
    # Set environment variable for backend port so next.config.mjs can read it
    env = os.environ.copy()
    env["BACKEND_PORT"] = str(backend_port)
    
    npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
    # Overriding host and port in Next.js via CLI args
    frontend = subprocess.Popen(
        [npm_cmd, "run", "dev", "--", "-H", web_host, "-p", str(frontend_port)], 
        cwd=frontend_dir, 
        env=env
    )

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping servers...")
        backend.terminate()
        frontend.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
