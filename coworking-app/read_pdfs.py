import glob
from pypdf import PdfReader
import os

pdf_files = glob.glob('sujets/*.pdf')
for pdf_file in pdf_files:
    print("=========================================")
    print("FILE:", pdf_file)
    print("=========================================")
    try:
        reader = PdfReader(pdf_file)
        text = ""
        # Only read first 3 pages if it's long, or all if short
        for i, page in enumerate(reader.pages):
            text += page.extract_text()
        
        # print first 3000 chars to not overwhelm the console
        print(text[:3000])
        if len(text) > 3000:
            print(f"... [Text truncated, total chars: {len(text)}]")
    except Exception as e:
        print("Error reading PDF:", e)
