####### views.py
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status

class OrderList(APIView):
    """
    List all orders, or create a new order.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        orders = Order.objects.filter(owner=request.user.pk).order_by("-created").all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    @transaction.atomic  # Ensures all operations are completed or rolled back if there's an error
    def post(self, request, format=None):
        serializer_order = OrderSerializer(data=request.data)
        if serializer_order.is_valid():
            order = serializer_order.save()  # Save the Order model
            
            for part_data in request.data.get('parts', []):
                paper_data = part_data.get('paper')
                # Check if a matching Paper already exists
                paper, created = Paper.objects.get_or_create(
                    name=paper_data['name'],
                    type=paper_data['type'],
                    density=paper_data['density'],
                    width=paper_data['width'],
                    height=paper_data['height'],
                    defaults={'manufacturer': paper_data.get('manufacturer')}
                )

                # Now create or update the part with the Paper instance
                part_data['paper_id'] = paper.id
                part_serializer = PartSerializer(data=part_data)
                if part_serializer.is_valid():
                    part_serializer.save(order=order)  # Save part with associated order and paper
                else:
                    return Response(part_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer_order.data, status=status.HTTP_201_CREATED)
        return Response(serializer_order.errors, status=status.HTTP_400_BAD_REQUEST)
