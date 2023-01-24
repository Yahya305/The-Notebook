import struct
def grayScale(inpFile,outFile):
    # inpFile=open("C:\\Users\\saimy\\Desktop\\sample22.bmp","rb")
    # inpFile=open("C:\\Users\\saimy\\Desktop\\sample22.bmp","rb")
    inpFile.seek(2)                                     # Skipping Signature Bytes
    print("FileSize is",struct.unpack('i',inpFile.read(4))[0],"kb")
    inpFile.seek(10)                                    # Skipping Reserved Bytes
    pix=struct.unpack('i',inpFile.read(4))
    inpFile.seek(18)                                    # Putting pointer at where Width and height is written
    width=struct.unpack('i',inpFile.read(4))[0]
    print("Width in Pixels :",width)
    height=struct.unpack('i',inpFile.read(4))[0]
    print("Height in Pixels :",height)
    # outFile=open("C:\\Users\\saimy\\Desktop\\sampleCopy.bmp","r+b")            # Used r+b to read and write Both in binary
    inpFile.seek(pix[0])                                # Setting file pointer to the very first pixel value(pix)
    outFile.seek(pix[0])                                # Setting file pointer to the very first pixel value(pix)
    print("\nPlease Wait...")

    for i in range(height):
        for j in range(width):
            b=int.from_bytes(inpFile.read(1),"little")
            g=int.from_bytes(inpFile.read(1),"little")
            r=int.from_bytes(inpFile.read(1),"little")
            grayScInt=int((b+g+r)/3)
            grayScByt=grayScInt.to_bytes(1,"little")     # Converting integer value back to bytes before writing in file
            outFile.write(grayScByt)
            outFile.write(grayScByt)
            outFile.write(grayScByt)

    inpFile.close()
    outFile.close()
    print("Done")
