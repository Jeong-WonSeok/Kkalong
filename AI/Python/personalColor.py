from os import system, chdir
import sys
sys.path.append("ShowMeTheColor/src")
import personal

system("cd")

def personal_color(img):
    result = personal.personalColor("jeong.jpg")
    return result