from django.http import HttpResponse
from reportlab.pdfgen import canvas
from datetime import datetime 
from django.http import HttpResponse
import os
from weasyprint import HTML
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

class KeryaPDF():
    def __init__(self,
                id_ = None,
                employer = "Jack Johnson",
                person = "Transilia Truck Rentals",
                matricule = 106,
                start = "2024-06-22",
                end = "2024-06-25",
                prix = 200  , 
                poids = "100" ,
                employer_id = -1 , 
                person_id = -1 
                ) -> None:
        self.id = id_
        self.employer = employer
        self.person = person
        self.matricule = matricule
        self.start = start
        self.end = end
        self.prix = prix
        self.poids = poids 
        self.employer_id = employer_id
        self.person_id = person_id
    def create(self):
        style = """
            body { 
                font-family: Arial, sans-serif;
                margin: 20px;
                background-color: #f9f9f9;
            }
            .container { 
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                position: relative;
            }
            h1, h2, p { 
                margin-bottom: 10px;
            }
            .info-box { 
                border-left: 4px solid #3498db;
                padding-left: 10px;
                margin-bottom: 20px;
            }
            .info-box strong { 
                font-weight: bold;
                color: #333;
            }
            .item-list { 
                list-style-type: none;
                padding-left: 0;
            }
            .item-list li { 
                margin-bottom: 5px;
            }
            .date-id {
                position: absolute;
                bottom: 20px;
                right: 20px;
                text-align: right;
                font-size: 0.8em;
            }            
            
            """
        __html = f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Facture de Location de Camion</title>
            <style>
            {style}
            </style>
            </head>
            <body>

            <div class="container">
                <h1 style="text-align: center;">Facture de Transilia</h1>
                <div class="info-box">
                    <p><strong>Owner of the truck:</strong> {self.employer}</p>
                    <p><strong>Nom du locataire:</strong> {self.person}</p>
                    <p><strong>Numéro de série du camion:</strong> {self.matricule}</p>
                    <p><strong>Début de la location:</strong> {self.start}</p>
                    <p><strong>Fin de la location:</strong> {self.end}</p>
                    <p><strong>Poids de la location:</strong> {self.poids} kg</p>
                    <p><strong>Prix de location:</strong> {self.prix} DZA</p>
                </div>
                <div class="date-id">
                    <p><strong>Date:</strong> <span id="current-date"> {datetime.now().strftime('[%Y-%m-%d]')} </span></p>
                    <p><strong>ID du propriétaire:</strong> {self.employer_id}</p>
                    <p><strong>ID du locataire:</strong> {self.person_id}</p>
                </div>
            </div>


            </body>
            </html>

                """

        # Read the HTML file
        path = None
        if self.id is None:
            path = "kerya.pdf"
        else:
            os.makedirs("./media/pdf/kerya/", exist_ok=True)
            path = f'media/pdf/kerya/{self.id}.pdf'
        # Convert HTML content to PDF
        HTML(string=__html).write_pdf(path)
        print(f'PDF generated: {path}')
        return path


class TawsilaPDF():
    def __init__(self,
                id_ = None,
                employer = "Jack Johnson",
                person = "Transilia Truck Rentals",
                distance = 106,
                produit = "sand",
                prix = "200" ,
                poids = "200 kg" , 
                employer_id = -1 , 
                person_id = -1 , 
                ) -> None:
        self.id = id_
        self.employer = employer
        self.person = person
        self.distance = distance
        self.prix = prix
        self.produit = produit
        self.poids = poids
        self.employer_id = employer_id
        self.person_id = person_id    
        self.tax = 0/100
        self.prix_apres = prix * (1 + self.tax)  
    def create(self):

        style = """
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f8f9fa;
                }

                .container {
                    width: 80%;
                    max-width: 600px;
                    background-color: #ffffff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                h1 {
                    text-align: center;
                    flex: 1;
                }

                .date-id {
                    text-align: right;
                    font-size: 0.8em;
                }

                .info-box {
                    margin: 20px 0;
                }

                .info-box p {
                    margin: 5px 0;
                }

                .item-list {
                    list-style-type: none;
                    padding: 0;
                }

                .item-list li {
                    background-color: #e9ecef;
                    padding: 10px;
                    margin: 5px 0;
                }
        """
        __html = f"""
        
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Facture de Transilia</title>
            <style>
            {style}
            </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Facture de Transilia</h1>
                        <div class="date-id">
                            <p><strong>Date:</strong> <span id="current-date">{datetime.now().strftime('[%Y-%m-%d]')}</span></p>
                            <p><strong>ID du livreur:</strong> {self.employer_id}</p>
                            <p><strong>ID du destinataire:</strong> {self.person_id}</p>
                        </div>
                    </div>
                    <div class="info-box">
                        <p><strong>Nom du livreur:</strong> {self.employer}</p>
                        <p><strong>Nom du destinataire:</strong> {self.person}</p>
                        <p><strong>Distance:</strong> {self.distance} km</p>
                        <p><strong>Poids de la location:</strong> {self.poids} kg</p>
                        <p><strong>Prix:</strong> {self.prix} DZA</p>
                        <p><strong>Prix après:</strong> {self.prix_apres} DZA</p>
                        <p><strong>Tax:</strong> {self.tax} DZA</p>
                    </div>
                    <h2>Article Livré:</h2>
                    <ul class="item-list">
                        <li>{self.produit}</li>
                    </ul>
                </div>
                </body>
                </html>

            """

        # Read the HTML file
        path = None
        if self.id is None:
            path = "tawsila.pdf"
        else:
            os.makedirs("./media/pdf/tawsila/", exist_ok=True)
            path = f'media/pdf/tawsila/{self.id}.pdf'
        # Convert HTML content to PDF
        HTML(string=__html).write_pdf(path)

        print(f'PDF generated: {path}')
        return path




@api_view(["POST"])
def tawsila_pdf(request:Request):
    
    PDF = TawsilaPDF(
        id_ = request.data['id_'] , 
        employer = request.data['employer'] , 
        person = request.data['person'] , 
        distance = request.data['distance'] , 
        produit = request.data['produit'] , 
        prix = request.data['prix'] , 
        poids = request.data['poids'] , 
        employer_id = request.data['employer_id'] , 
        person_id = request.data['person_id'] 
    )
    path = PDF.create()
    return Response({"path":path } , status=status.HTTP_200_OK)

@api_view(["POST"])
def kerya_pdf(request:Request):
    
    PDF:KeryaPDF = KeryaPDF(
        id_ = request.data['id_'],
        employer = request.data['employer'],
        person = request.data['person'],
        matricule = request.data['matricule'],
        start = request.data['start'],
        end = request.data['end'],
        prix = request.data['prix'],
        poids = request.data['poids'],
        employer_id = request.data['employer_id'],
        person_id = request.data['person_id']  
    )
    path = PDF.create()
    return Response({"path":path } , status=status.HTTP_200_OK)


# KeryaPDF(
#     id_=-1,
#     person="bruh",
#     employer="wow",
#     prix=300 
    
# ).create()
# TawsilaPDF(
#     person="bruh",
#     id_=-1,
#     employer="wow",
#     prix=300
# ).create()
