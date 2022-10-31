
# import sys
# import numpy as np
# import skimage.color
# import skimage.filters
# import skimage.io
# import skimage.viewer
import cv2
import pandas as pd
from PIL import Image, ImageFilter

# img = cv2.imread('019595_1.png', 0)
# blur = cv2.GaussianBlur(img, (5, 5), 0)
# ret3, th3 = cv2.threshold(blur,252,255,cv2.THRESH_BINARY_INV)
# # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# # NV + cv2.THRESH_OTSU)
# cv2.imshow("result", th3)
# cv2.waitKey(0)

#
# pil_image = Image.fromarray(th3)
# pil_image=Image.fromarray(th3)
# image = pil_image.filter(ImageFilter.ModeFilter(size=13))

img = cv2.imread('019595_1.png', 0)

blur = cv2.GaussianBlur(img,(5,5),0)
#배경가장자리에서 색깔구하기.
df = pd.DataFrame(blur)
row_border_min = min(df.iloc[0].values)
column_border_min = min(df[0].values)

blur = cv2.GaussianBlur(img,(5,5),0)

if min(row_border_min, column_border_min) == 255:
    ret3,th3 = cv2.threshold(blur,250,255,cv2.THRESH_BINARY_INV)
else:
    ret3,th3 = cv2.threshold(blur,min(row_border_min, column_border_min),255,cv2.THRESH_BINARY_INV)

pil_image = Image.fromarray(th3)
image = pil_image.filter(ImageFilter.ModeFilter(size=13))

cv2.imshow(image)