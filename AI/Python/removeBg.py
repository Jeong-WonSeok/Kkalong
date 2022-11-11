import PIL.Image

from carvekit.api.interface import Interface
from carvekit.ml.wrap.fba_matting import FBAMatting
from carvekit.ml.wrap.tracer_b7 import TracerUniversalB7
from carvekit.pipelines.postprocessing import MattingMethod
from carvekit.pipelines.preprocessing import PreprocessingStub
from carvekit.trimap.generator import TrimapGenerator

def remove():


    # Check doc strings for more information
    seg_net = TracerUniversalB7(device='cpu',
                                batch_size=1)

    fba = FBAMatting(device='cpu',
                     input_tensor_size=2048,
                     batch_size=1)

    trimap = TrimapGenerator()

    preprocessing = PreprocessingStub()

    postprocessing = MattingMethod(matting_module=fba,
                                   trimap_generator=trimap,
                                   device='cpu')

    interface = Interface(pre_pipe=preprocessing,
                          post_pipe=postprocessing,
                          seg_pipe=seg_net)

    image = PIL.Image.open('https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/pants.jpg?alt=media&token=1536bd81-12cf-4d4b-af26-d685a2e97b96')
    # image = PIL.Image.open('carvekit-data/pants.jpg')
    cat_wo_bg = interface([image])[0]
    cat_wo_bg.save('3.png')

remove()