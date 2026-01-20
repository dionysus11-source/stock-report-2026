import os
import sys

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    run_webapp_script = os.path.join(root_dir, "run_webapp.py")
    
    if os.path.exists(run_webapp_script):
        # We can either import and run it or start it as a subprocess.
        # Starting it via subprocess is safer for maintaining current behavior.
        import subprocess
        try:
            subprocess.check_call([sys.executable, run_webapp_script])
        except KeyboardInterrupt:
            # Subprocess will handle its own termination or we can let it propagate
            pass
        except subprocess.CalledProcessError as e:
            print(f"Error starting application: {e}")
            sys.exit(1)
    else:
        print(f"Error: {run_webapp_script} not found.")
        sys.exit(1)

if __name__ == "__main__":
    main()
