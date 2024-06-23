

# myapp/views.py
import plotly.graph_objects as go
from django.http import HttpResponse
from plotly.offline import plot
from API import models , serializers 
def plot_graph(request):
    x_data = [1, 2, 3, 4, 5]
    y_data = [10, 20, 15, 25, 30]

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x_data, y=y_data, mode='lines+markers'))

    plot_div = plot(fig, output_type='div')

    return HttpResponse(plot_div)
