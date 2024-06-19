from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

def generate_pdf(request):
    # Get all query parameters from the GET request
    query_params = request.GET.dict()

    # Create PDF document using reportlab with a larger custom page size
    custom_page_width = 800  # Specify custom width in points (1 inch = 72 points)
    custom_page_height = 600  # Specify custom height in points (1 inch = 72 points)
    custom_page_size = (custom_page_width, custom_page_height)
    
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="facture.pdf"'

    p = SimpleDocTemplate(response, pagesize=custom_page_size)  # Use custom page size
    styles = getSampleStyleSheet()
    h1_style = styles['Heading1']
    h1 = Paragraph("Une facture de Transiliya", h1_style)
    
    # Increase the font size of the normal style
    styles['Normal'].fontSize = 20  # You can adjust the font size as needed
    N = 140
    # Add header and data to the PDF
    elements = [h1, Spacer(1, 20)]
    
    # Loop through each parameter and append its value as a separate paragraph with 30 spaces
    for param, value in query_params.items():
        spaces = "\u00A0" * N  # Create 30 non-breaking spaces
        param_paragraph = Paragraph(f"{param.capitalize()}: {value}{spaces}", styles['Normal'])  # Add spaces after value
        elements.append(param_paragraph)
    
    p.build(elements)

    return response
