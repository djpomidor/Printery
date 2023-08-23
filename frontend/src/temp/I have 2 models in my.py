I have 2 models in my 

# models.py:
class Order(models.Model):
    name = models.CharField(blank=True, max_length=16)

class PrintSchedule(models.Model):
    order = models.ForeignKey(Order, related_name='printing', on_delete = models.CASCADE)   
    position = models.IntegerField(null=True, blank=True)
    parent_day = models.CharField(blank=True, max_length=20)

# serializers.py:

class PrintSheduleSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True) 
    class Meta:
        model = PrintSchedule
        fields = ['order', 'parent_day', 'position']

class OrderSerializer(serializers.ModelSerializer):
    parent_day = PrintSheduleSerializer()
    position = PrintSheduleSerializer()
    class Meta:
        model = Order 
        fields = ['pk', 'name', 'parent_day', 'position' ]

How can i get Order object with  'parent_day' and 'position'?       

# views.py:
class Update_position(APIView):
    permission_classes = (AllowAny,)
    def get_object(self, pk):
        try:
            print("!!pk__", pk)
            return PrintSchedule.objects.get(order=pk)
        except Order.DoesNotExist: 
            raise Http404    

        
    def put(self, request, pk, format=None):
        item = self.get_object(pk)
        position = request.data.get('position')
        parent_day = request.data.get('parent_day')
        serializer = PrintSheduleSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



How can I do when I instantiate an Order then PrintShedule automatically instantiated in the database and it has the order id in the "Order" field.        

How can i make that when i create the Order instance then automaticly creates the PrintShedule instance in database, whith id of Order's in field "order".

Как я могу сделать, чтобы когда я создаю экземпляр Order, тогда автоматически создается экземпляр Printshedule в базе данных, и он имеет идентификатор заказа в поле «Порядок».

How can I do when I instantiate an Order then PrintShedule automatically instantiated in the database and it has the order id in the "Order" field.

