# ./bin/OpenPoseDemo.exe --image_dir examples/media/ --write_images output/ --disable_blending --hand --write_json output_jsons/ --display 0
import sys
import os
import subprocess
sys.path.append("openpose/")

def openpose():
    os.chdir("openpose")
    print(os.getcwd())
    os.system('chcp 65001')
    # '""test.py" "a" "b" "c""'
    # os.system('""./bin/OpenPoseDemo.exe --image_dir examples/media/ --write_images output/ --disable_blending --hand --write_json output_jsons/ --display 0 ""')
    subprocess.check_call(["./bin/OpenPoseDemo.exe", "--image_dir examples/media/", "--write_images output/", "--disable_blending --hand", "--write_json output_jsons/", "--display 0"])

openpose()
