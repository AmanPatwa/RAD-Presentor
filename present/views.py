import convertapi
import os
import textract
import smtplib
import datetime
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from present.text_generator import TextRank
from .models import presentor, student
SenderAddress = "Email"
password = "password"
convertapi.api_secret = '8Hiq6DlnmMAovBXF'
glob_file = ''
glob_file_pdf = ''
student_data = student.objects.values('email')

def email_sender():
    ''' EMAIL CLIENT '''

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(SenderAddress, password)
    subject = "Transcript of lecture conducted!"
    msg = "Here is transcription for " + glob_file.strip[0] + " dated " + str(datetime.datetime.now())
    body = "Subject: {}\n\n{}".format(subject,msg)
    for email in emails:
        server.sendmail(SenderAddress, email, body)
    server.quit()


def text_extractor_keywords():
    ''' EXTRACT TEXT FROM FILE AND FIND KEYWORDS '''

    text = textract.process(glob_file_pdf)
    text = str(text)
    text_list = text.split('\\n\\n\\x0c')
    keyword_array = []
    tr = TextRank()
    for t in text_list:
        tr.analyze(t, candidate_pos = ['NOUN', 'PROPN'], window_size=4, lower=False)
        keyword_array.append(tr.get_keywords(3))
    return keyword_array
    

def ppt_pdf(fname):
    ''' PPT TO PDF '''
    
    os.chdir(os.getcwd() + '/media')
    filename = fname
    print("File chosen : "+ filename)
    resultant = fname.split('.')[0] + '.pdf'
    result = convertapi.convert('pdf', { 'File': filename })
    result.file.save(resultant)
    print("File converted to : "+ resultant)


def home(request):
    ''' HOME URL '''
    
    # print(os.getcwd())
    return render(request, 'present/index.html')


def upload(request):
    ''' PDF UPLOADER '''
    
    global glob_file
    global glob_file_pdf
    if request.method == 'POST':
        uploaded_file = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        glob_file = uploaded_file.name
        glob_file_pdf = glob_file.split('.')[0] + '.pdf'
        print(uploaded_file.name + "is stored at /media")
        ppt_pdf(uploaded_file.name)
        print(uploaded_file.name + "is converted and stored at /media")        
    return redirect('/live_presentor')


def live_presentor(request):
    ''' START LIVE '''

    print(glob_file_pdf)
    nlp_keywords = text_extractor_keywords()
    print(nlp_keywords)
    return render(request, 'present/home.html', {'nlp_keywords': nlp_keywords})