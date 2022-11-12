from os import system, chdir
import sys
sys.path.append("ShowMeTheColor/src")
import personal

system("cd")

result = personal.personalColor("3.jpg")
# personal.personalColor("3.jpg")

print(result)