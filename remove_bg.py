from PIL import Image, ImageDraw
import sys
import os

def remove_background(input_path, output_path):
    try:
        # Open the image
        img = Image.open(input_path).convert("RGBA")
        
        # We assume the top-left pixel is the background color
        # and we want to flood-fill from the outside edges
        ImageDraw.floodfill(img, xy=(0, 0), value=(0, 0, 0, 0), thresh=50)
        ImageDraw.floodfill(img, xy=(img.width - 1, 0), value=(0, 0, 0, 0), thresh=50)
        ImageDraw.floodfill(img, xy=(0, img.height - 1), value=(0, 0, 0, 0), thresh=50)
        ImageDraw.floodfill(img, xy=(img.width - 1, img.height - 1), value=(0, 0, 0, 0), thresh=50)
        
        # Save the result
        img.save(output_path, "PNG")
        print(f"Successfully saved transparent image to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    in_file = os.path.join(base_dir, "brand_assets", "master-raster.png")
    out_file = os.path.join(base_dir, "brand_assets", "master-raster-transparent.png")
    remove_background(in_file, out_file)
