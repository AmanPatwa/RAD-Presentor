def ppt_pdf(name):
    result = convertapi.convert('pdf', { 'File': '../media/'+name+'.pptx' })
    result.file.save('../media/'+name+'.pdf')