from spoken_to_signed.bin import _text_to_gloss, _gloss_to_pose
from pose_format import Pose
from pose_format.pose_visualizer import PoseVisualizer

LEXICON_DIR = "assets/"
POSE_FOLDER = {
    "vsl": "vi_lexicon",
    "asl": "en_lexicon",
}
    
def to_pose(text, output_dst, src_lang="vi", dst_lang="vsl", glosser="spacylemma"):
    '''
    text: input sentence
    output_dst: name of the .pose output file
    src_lang: ['vi', 'en'] input language
    dst_lang: ['vsl', 'asl'] output language
    '''
    lexicon = LEXICON_DIR + \
        POSE_FOLDER[dst_lang]  # directory of the translated lexicon, including indexing csv

    sentences = _text_to_gloss(text, src_lang, glosser="rules")

    # print(sentences)
    pose = _gloss_to_pose(sentences, lexicon, src_lang, dst_lang)

    with open(output_dst, "wb") as f:
        pose.write(f)

    print("Text to gloss to pose")
    print("Input text:", text)
    print("Output pose:", pose)

def show_pose(pose_file):
    '''
    pose_file: .pose file to visualize
    '''
    
    with open(f"{pose_file}", "rb") as f:
        p = Pose.read(f.read())

    # Resize to 256, for visualization speed
    scale = p.header.dimensions.width / 256
    p.header.dimensions.width = int(p.header.dimensions.width / scale)
    p.header.dimensions.height = int(p.header.dimensions.height / scale)
    p.body.data = p.body.data / scale

    # Genearate .gif
    v = PoseVisualizer(p)

    v.save_gif("quick_test.gif", v.draw())