import subprocess
import os
import sys
import time

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_script = os.path.join(root_dir, "webapp", "backend", "main.py")
    frontend_dir = os.path.join(root_dir, "webapp", "frontend")

    print(f"Starting Backend from {backend_script}...")
    # Start backend
    backend = subprocess.Popen([sys.executable, backend_script], cwd=root_dir)

    print(f"Starting Frontend from {frontend_dir}...")
    # Start frontend
    # Use 'npm.cmd' on windows
    npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
    frontend = subprocess.Popen([npm_cmd, "run", "dev"], cwd=frontend_dir)

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
