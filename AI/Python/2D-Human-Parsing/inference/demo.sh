CUDA_VISIBLE_DEVICES=0 \
python inference_acc.py \
--loadmodel '../pretrained/deeplabv3plus-xception-vocNov14_20-51-38_epoch-89.pth' \
--img_list ../demo_imgs/img_list.txt \
--output_dir ../parsing_result