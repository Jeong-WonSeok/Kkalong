from os import system, chdir
import sys
sys.path.append("ShowMeTheColor/src")
import personal


def personal_color(img):
    result = personal.personalColor(img)
    return result

print(personal_color("./sampleData/IU.jpg"))
