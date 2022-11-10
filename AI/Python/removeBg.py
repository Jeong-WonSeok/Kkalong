import torch
import os
from carvekit.api.high import HiInterface

def remove(id):
    # imgUrl :str = 'https://firebasestorage.googleapis.com'+'/'+'v0'+'/'+'b'+'/'+'kkalong-b4cec.appspot.com'+'/'+'o'+'/' + id + '?alt=media'
    imgUrl = os.path.join('https:','firebasestorage.googleapis.com','v0','b','kkalong-b4cec.appspot.com','o', id +'?alt=media')
    print(imgUrl)
    interface = HiInterface(object_type="hairs-like",  # Can be "object" or "hairs-like".
                            batch_size_seg=5,
                            batch_size_matting=1,
                            device='cuda' if torch.cuda.is_available() else 'cpu',
                            seg_mask_size=640,  # Use 640 for Tracer B7 and 320 for U2Net
                            matting_mask_size=2048,
                            trimap_prob_threshold=231,
                            trimap_dilation=30,
                            trimap_erosion_iters=5,
                            fp16=False)
    images_without_background = interface([imgUrl])

    cat_wo_bg = images_without_background[0]
    cat_wo_bg.save('2.png')
    return "good"


remove('7')