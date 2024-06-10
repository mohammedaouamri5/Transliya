from django.test import TransactionTestCase
from django.contrib.gis.geos import Point
from django.contrib.auth.hashers import make_password
from django.utils import timezone

from .models import (
    Person, Employer, CarType, Car5adam, Tewsila, Kerya, Admin, 
    Salahiyat, AdminSalahiyat, GetPayed
)

class ModelsTransactionTestCase(TransactionTestCase):
    def setUp(self):
        # Create a person
        self.person1 = Person.objects.create(
            username='person1',
            password=make_password('password123'),
            phone_number_p=1234567890
        )
        
        # Create an employer
        self.employer = Employer.objects.create(
            id_employer=self.person1,
            driving_license=123456,
            ta9yim_employer=4.5
        )
        
        # Create car types
        self.car_type = CarType.objects.create(
            name_car_type='Sedan',
            Kerya_prix_car_type=100.0,
            Tewsila_prix_car_type=50.0
        )
        
        # Create Car5adam
        self.car5adam = Car5adam.objects.create(
            id_employer=self.employer,
            id_type_car=self.car_type,
            matricule=123456789
        )
        
        # Create another person for Tewsila and Kerya
        self.person2 = Person.objects.create(
            username='person2',
            password=make_password('password123'),
            phone_number_p=1234567891
        )
        
        # Create Tewsila
        self.tewsila = Tewsila.objects.create(
            t_started=timezone.now().time(),
            t_ended=timezone.now().time(),
            from_location=Point(0, 0),
            to_location=Point(1, 1),
            id_car_employer=self.car5adam,
            id_zaboun=self.person2,
            comment_Tewsila='Good service',
            ta9yim_Tewsila=5.0
        )
        
        # Create Kerya
        self.kerya = Kerya.objects.create(
            t_started=timezone.now().time(),
            t_ended=timezone.now().time(),
            id_car_employer=self.car5adam,
            id_zaboun=self.person2,
            comment_Kerya='Great service',
            ta9yim_Kerya=4.8
        )
        
        # Create an admin
        self.admin = Admin.objects.create(
            id_admin=self.person1
        )
        
        # Create a salahiya
        self.salahiya = Salahiyat.objects.create(
            name_salahiya='Manage Users'
        )
        
        # Assign salahiya to admin
        self.admin_salahiyat = AdminSalahiyat.objects.create(
            id_admin=self.admin,
            id_salahiya=self.salahiya
        )
        
        # Create a payment record
        self.payment = GetPayed.objects.create(
            id_employer=self.employer,
            prix=200.0
        )

    def test_person_creation(self):
        self.assertEqual(Person.objects.count(), 2)

    def test_employer_creation(self):
        self.assertEqual(Employer.objects.count(), 1)

    def test_car_type_creation(self):
        self.assertEqual(CarType.objects.count(), 1)

    def test_car5adam_creation(self):
        self.assertEqual(Car5adam.objects.count(), 1)

    def test_tewsila_creation(self):
        self.assertEqual(Tewsila.objects.count(), 1)

    def test_kerya_creation(self):
        self.assertEqual(Kerya.objects.count(), 1)

    def test_admin_creation(self):
        self.assertEqual(Admin.objects.count(), 1)

    def test_salahiyat_creation(self):
        self.assertEqual(Salahiyat.objects.count(), 1)

    def test_admin_salahiyat_creation(self):
        self.assertEqual(AdminSalahiyat.objects.count(), 1)

    def test_get_payed_creation(self):
        self.assertEqual(GetPayed.objects.count(), 1)
