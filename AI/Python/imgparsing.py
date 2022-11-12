import os
import torch

def imgParsing(url):

    print(torch.version)
    print(torch.version.cuda)
    print(torch.backends.cudnn.version())
    print(torch.cuda.is_available())
    # text_file_path = './2D-Human-Parsing/demo_imgs/img_list.txt'
    #
    # with open(text_file_path, 'w') as f:
    #     f.write(url);
    #
    # os.system("./2D-Human-Parsing/inference/demo.sh")
    # !nvcc --version


imgParsing("https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/test.jpg?alt=media")