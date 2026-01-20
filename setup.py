import subprocess
import os
import sys

def run_command(command, cwd=None):
    print(f"Executing: {' '.join(command)} in {cwd or 'current directory'}")
    try:
        subprocess.check_call(command, cwd=cwd, shell=True if os.name == 'nt' else False)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        sys.exit(1)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Install Backend dependencies
    print("\n--- Installing Backend Dependencies ---")
    requirements_path = os.path.join(root_dir, "webapp", "backend", "requirements.txt")
    if os.path.exists(requirements_path):
        run_command([sys.executable, "-m", "pip", "install", "-r", requirements_path])
    else:
        print(f"Warning: {requirements_path} not found.")

    # 2. Install Frontend dependencies
    print("\n--- Installing Frontend Dependencies ---")
    frontend_dir = os.path.join(root_dir, "webapp", "frontend")
    if os.path.exists(frontend_dir):
        npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
        run_command([npm_cmd, "install"], cwd=frontend_dir)
    else:
        print(f"Warning: {frontend_dir} not found.")

    print("\n--- Setup Complete! ---")
    print("You can now start the application using: python run_app.py")

if __name__ == "__main__":
    main()
