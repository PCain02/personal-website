import os
from PIL import Image, ImageOps
import pillow_heif
import imageio


def resize_image_if_needed(image, max_pixels=89478485):
    """Resize the image if it exceeds the maximum pixel limit."""
    if image.width * image.height > max_pixels:
        print(f"Resizing image from {image.width}x{image.height} to fit within {max_pixels} pixels.")
        scale_factor = (max_pixels / (image.width * image.height)) ** 0.5
        new_width = int(image.width * scale_factor)
        new_height = int(image.height * scale_factor)
        image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)  # Updated to use LANCZOS
    return image


def convert_heic_to_png(input_dir, output_dir):
    # Register HEIF opener with Pillow
    pillow_heif.register_heif_opener()

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process all HEIC files in input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith((".heic", ".heif")):
            input_path = os.path.join(input_dir, filename)
            output_filename = f"{os.path.splitext(filename)[0]}.png"
            output_path = os.path.join(output_dir, output_filename)

            try:
                # Open and convert the image
                image = Image.open(input_path)
                # Convert to RGB mode if necessary
                if image.mode != "RGB":
                    image = image.convert("RGB")
                # Save as PNG
                image.save(output_path, "PNG")
                print(f"Converted {filename} to {output_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")


def convert_heic_in_place(input_dir):
    """Convert HEIC files to PNG in the same directory"""
    pillow_heif.register_heif_opener()

    for filename in os.listdir(input_dir):
        if filename.lower().endswith((".heic", ".heif")):
            input_path = os.path.join(input_dir, filename)
            output_filename = f"{os.path.splitext(filename)[0]}.png"
            output_path = os.path.join(input_dir, output_filename)

            try:
                image = Image.open(input_path)
                if image.mode != "RGB":
                    image = image.convert("RGB")
                image.save(output_path, "PNG")
                print(f"Converted {filename} to {output_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")


def convert_to_mov(input_dir, output_dir, fps=30):
    """Convert supported files to MOV"""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Supported input formats
    supported_formats = (".png", ".jpg", ".jpeg", ".mp4", ".tif")  # Added .tif

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(supported_formats):
            input_path = os.path.join(input_dir, filename)
            output_filename = f"{os.path.splitext(filename)[0]}.mov"
            output_path = os.path.join(output_dir, output_filename)

            try:
                if filename.lower().endswith((".tif", ".png", ".jpg", ".jpeg")):  # .tif is already in the condition
                    # Handle single image to video conversion
                    img = imageio.imread(input_path)
                    # Create a 3 second video from the image
                    writer = imageio.get_writer(output_path, fps=fps)
                    for _ in range(fps * 3):  # 3 seconds duration
                        writer.append_data(img)
                    writer.close()
                elif filename.lower().endswith(".mp4"):
                    # Handle video conversion
                    reader = imageio.get_reader(input_path)
                    writer = imageio.get_writer(output_path, fps=fps)
                    for frame in reader:
                        writer.append_data(frame)
                    writer.close()
                    reader.close()

                print(f"Converted {filename} to {output_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")


def convert_heic_to_webp(input_dir, output_dir):
    """Convert HEIC files to WebP format."""
    # Register HEIF opener with Pillow
    pillow_heif.register_heif_opener()

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process all HEIC files in input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith((".heic", ".heif")):
            input_path = os.path.join(input_dir, filename)
            output_filename = f"{os.path.splitext(filename)[0]}.webp"
            output_path = os.path.join(output_dir, output_filename)

            try:
                # Open and convert the image
                image = Image.open(input_path)
                # Resize if necessary
                image = resize_image_if_needed(image)
                # Convert to RGB mode if necessary
                if image.mode != "RGB":
                    image = image.convert("RGB")
                # Save as WebP
                image.save(output_path, "WEBP")
                print(f"Converted {filename} to {output_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")


def convert_to_webp(input_dir, output_dir):
    """Convert supported files to WebP format."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Supported input formats
    supported_formats = (".png", ".jpg", ".jpeg", ".tif", ".bmp")

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(supported_formats):
            input_path = os.path.join(input_dir, filename)
            output_filename = f"{os.path.splitext(filename)[0]}.webp"
            output_path = os.path.join(output_dir, output_filename)

            try:
                # Open and convert the image
                image = Image.open(input_path)
                # Resize if necessary
                image = resize_image_if_needed(image)
                if image.mode != "RGB":
                    image = image.convert("RGB")
                # Save as WebP
                image.save(output_path, "WEBP")
                print(f"Converted {filename} to {output_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")


def main():
    # Set up directories
    input_dir = "cs_projects/thumbnails"
    output_dir = "cs_projects/thumbnails"

    # Step 1: Convert HEIC to WebP in input directory
    #print("Converting HEIC files to WebP...")
    #convert_heic_to_webp(input_dir, output_dir)

    # Step 2: Convert all supported files to WebP
    print("\nConverting files to WebP...")
    convert_to_webp(input_dir, output_dir)


if __name__ == "__main__":
    main()
