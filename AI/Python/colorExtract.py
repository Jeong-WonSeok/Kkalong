import cv2
import numpy as np

import os
from collections import defaultdict

from colorthief import ColorThief
import matplotlib.pyplot as plt
import colorsys



def image_preprocess():

    target_item = "1.png"
    image = cv2.imread(target_item, cv2.IMREAD_UNCHANGED)
    ct = ColorThief("sampleData/1.png")

    #이미지에서 가장 많은 비율을 차지하는 색깔 추출
    dominant_color = ct.get_color(quality=1)

    # palette = ct.get_palette(color_count=5)
    print(dominant_color)
    plt.imshow([[dominant_color]])
    # for i in range(5):
    #     plt.imshow([[palette[i]]])
    plt.show()

image_preprocess()


