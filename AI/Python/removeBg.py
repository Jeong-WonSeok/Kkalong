import torch
from carvekit.api.high import HiInterface

def remove(id, email):
    imgUrl :str = 'https://firebasestorage.googleapis.com//v0//b//kkalong-b4cec.appspot.com//o//%s_%s?alt=media'%(id, email)
    interface = HiInterface("hairs-like",  # Can be "object" or "hairs-like".
                            5,
                            1,
                            'cuda' if torch.cuda.is_available() else 'cpu',
                            640,  # Use 640 for Tracer B7 and 320 for U2Net
                            2048,
                            231,
                            30,
                            5,
                            False)
    images_without_background = interface([imgUrl])
    cat_wo_bg = images_without_background[0]
    cat_wo_bg.save('2.png')
    return "good"


remove('-1', 'ducky_313@naver.com')