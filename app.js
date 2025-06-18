import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();

const productos = [
  {
    id: '1',
    nombre: 'Tenis adidas Casual',
    precio: 10.99,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShqFXITYFR-zGyUHuJ4iqBZI1S6GWM0-T9dQ&s',
    reseñas: [5, 4, 4, 5],
    descripcion: 'Diseñados para el uso diario, estos tenis Adidas combinan estilo y comodidad. Perfectos para cualquier ocasión casual, ofreciendo un ajuste suave y duradero.'
  },
  {
    id: '2',
    nombre: 'Adidas Dame 9',
    precio: 100.18,
    imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8b56cea1b837482e90980058b927ece7_9366/Tenis_Dame_9_Amarillo_JH6627_01_00_standard.jpg',
    reseñas: [3, 4, 4, 3],
    descripcion: 'Los Adidas Dame 9 son ideales para jugadores de baloncesto, brindando un soporte excepcional y amortiguación receptiva en la cancha. Su diseño moderno los hace destacar.'
  },
  {
    id: '3',
    nombre: 'Adidas Dame 3 Certified',
    precio: 83.47,
    imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/90548a68944b413da0fdc372460a607d_9366/Tenis_Dame_Certified_3_Negro_JI1546_01_00_standard.jpg',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Con un estilo icónico y rendimiento de élite, los Adidas Dame 3 Certified están hechos para el baloncesto. Ofrecen tracción superior y una sensación ligera para movimientos rápidos.'
  },
  {
    id: '4',
    nombre: 'NIKE KOBE 9',
    precio: 290.00,
    imagen: 'https://static.nike.com/a/images/w_1280,q_auto,f_auto/7acc251d-4f22-4bbe-8b22-2fbfb45db3a8/fecha-de-lanzamiento-de-los-kobe-5-protro-deep-royal-blue-hj4303-400.jpg',
    reseñas: [5, 5, 5, 5],
    descripcion: 'Los Nike Kobe 9 son un tributo a la leyenda, diseñados para la agilidad y precisión. Su construcción ligera y soporte avanzado los hacen perfectos para la cancha.'
  },
  {
    id: '5',
    nombre: 'NIKE KYRIE IRVING 7',
    precio: 199.99,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_f7dKFLYMQOsI9iEmW6HeQ43vmaZ09uP2bQ3HXjeN48D0S18Al12MzbPDiHtnBvCIJ44&usqp=CAU',
    reseñas: [5, 5, 5, 5],
    descripcion: 'Explosivos y con un agarre sin igual, los Nike Kyrie Irving 7 son para los jugadores más creativos. Ofrecen un control excepcional y una respuesta inmediata.'
  },
  {
    id: '6',
    nombre: 'SHAQ',
    precio: 25.99,
    imagen: 'https://images.impuls.com.mx/images/176009-1-large.jpg',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Los tenis Shaq son un clásico para el baloncesto, ofreciendo durabilidad y soporte para un rendimiento robusto en la cancha. Perfectos para quienes buscan resistencia.'
  },
  {
    id: '7',
    nombre: 'NEW BALANCE KAKWHI',
    precio: 75.99,
    imagen: 'https://sneakernews.com/wp-content/uploads/2020/08/new-balance-kawhi-4-bounces-4.jpg?w=1200',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Los New Balance Kawhi, diseñados para la élite, ofrecen estabilidad y confort. Ideales para jugadores que buscan una zapatilla de alto rendimiento con estilo único.'
  },
  {
    id: '8',
    nombre: 'ANTA KAI 1',
    precio: 79.09,
    imagen: 'https://anta.com/cdn/shop/files/01_d9df7080-7d82-4beb-9444-523c7c94bdaa_720x.jpg?v=1737448782',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Los Anta Kai 1 son zapatillas de baloncesto con un diseño innovador y soporte avanzado. Proporcionan un excelente agarre y amortiguación para un juego dinámico.'
  },
  {
    id: '9',
    nombre: 'LUKA DONCIC 3',
    precio: 79.09,
    imagen: 'https://bouncewear.com/cdn/shop/files/AURORA_FQ1284-001_PHSRH000-2000_grande.jpg?v=1723029581',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Los Luka Doncic 3 están pensados para la versatilidad en la cancha. Ofrecen una combinación de soporte, flexibilidad y un estilo único para dominar el juego.'
  },
  {
    id: '10',
    nombre: 'SPALDING BALON NEGRO',
    precio: 14.50,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVqDMIhXmRMarcUo1dD8-NE2tLHkE484szd_7cDUaINTVqsqyAolfr3sd9DDqR1cz2rw&usqp=CAU',
    reseñas: [5, 4, 5, 4],
    descripcion: 'Balón de baloncesto Spalding negro, ideal para entrenamientos y partidos casuales. Ofrece un buen agarre y durabilidad para todas tus sesiones de juego.'
  },
  {
    id: '11',
    nombre: 'Balón de Baloncesto Wilson NBA Oficial',
    precio: 65.00,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXf6M297uXy-WCiTPn0jBOxNfcfXgSUs2ZHw&s',
    reseñas: [5, 5, 4, 5],
    descripcion: 'El balón oficial de la NBA, el Wilson NBA es perfecto para el juego profesional. Su superficie ofrece un control excepcional y una durabilidad inigualable.'
  },
  {
    id: '12',
    nombre: 'Rodilleras Deportivas Pro',
    precio: 29.99,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrD1EmSPYRJabg1QKL6FwujdSF3FflDs6pBg&s',
    reseñas: [4, 3, 5, 4],
    descripcion: 'Estas rodilleras deportivas profesionales brindan soporte y protección. Ideales para prevenir lesiones durante actividades físicas intensas y garantizar tu seguridad.'
  },
  {
    id: '13',
    nombre: 'Camiseta Básquet Jordan Jumpman',
    precio: 35.50,
    imagen: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4d53814e-32c6-4894-a989-f9a9c4c64981/M+J+FLT+MVP+RNGS+85+SS+CREW.png',
    reseñas: [5, 4, 5, 5],
    descripcion: 'La camiseta Jordan Jumpman combina estilo y comodidad para los amantes del baloncesto. Fabricada con materiales ligeros, te mantendrá fresco dentro y fuera de la cancha.'
  },
  {
    id: '14',
    nombre: 'Calcetas de Baloncesto Nike Elite',
    precio: 15.00,
    imagen: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/kknrddqanopdoxwe5j05/U+NK+ELITE+CREW+132.png',
    reseñas: [4, 4, 4, 5],
    descripcion: 'Las calcetas Nike Elite ofrecen amortiguación estratégica y soporte de arco para una comodidad superior. Perfectas para el rendimiento en la cancha, reduciendo la fatiga.'
  },
  {
    id: '15',
    nombre: 'Mochila Nike Hoops Elite Pro',
    precio: 70.00,
    imagen: 'https://elektra.vtexassets.com/arquivos/ids/13599657-800-auto?v=638839693713170000&width=800&height=auto&aspect=true',
    reseñas: [5, 5, 5, 4],
    descripcion: 'La mochila Nike Hoops Elite Pro está diseñada para organizar tu equipo de baloncesto. Con múltiples compartimentos, incluyendo uno para el balón, es ideal para tus sesiones de entrenamiento.'
  },
  {
    id: '16',
    nombre: 'Zapatillas Curry Flow 10',
    precio: 150.00,
    imagen: 'https://cdnx.jumpseller.com/bendita-bodega/image/61163533/resize/900/900?1741625103',
    reseñas: [5, 5, 4, 5],
    descripcion: 'Las Curry Flow 10 ofrecen una tracción sin igual y una sensación de ligereza. Diseñadas para la velocidad y el control, son perfectas para jugadores que buscan agilidad en la cancha.'
  },
  {
    id: '17',
    nombre: 'Shorts de Baloncesto Adidas',
    precio: 28.00,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvckZzMKOb3CqWTl5AoIPoiZSGNPmBY02DHA&s',
    reseñas: [4, 4, 3, 4],
    descripcion: 'Estos shorts de baloncesto Adidas combinan comodidad y estilo. Fabricados con tejido transpirable, te mantienen fresco y seco durante tus partidos o entrenamientos.'
  },
  {
    id: '18',
    nombre: 'JERSEY ',
    precio: 89.00,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_AMSwJx4CRTaEnTLAyciK3IN2NT7EdASyw&s',
    reseñas: [3, 4, 5, 3],
    descripcion: 'Este jersey de baloncesto es ideal para mostrar tu pasión por el juego. Confeccionado con materiales duraderos, ofrece comodidad y resistencia para el uso diario.'
  },
  {
    id: '19',
    nombre: 'Bomba para Balones',
    precio: 8.50,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7uJMfCBaSc9PVqIcn5FKcyO0xgV-RWX2y4Q&s',
    reseñas: [4, 5, 4, 5],
    descripcion: 'Bomba compacta y eficiente para balones. Incluye aguja y es perfecta para mantener tus balones con la presión adecuada en todo momento.'
  },
  {
    id: '20',
    nombre: 'Protector Bucal Deportivo',
    precio: 9.99,
    imagen: 'https://http2.mlstatic.com/D_Q_NP_799837-MLU73761037393_012024-O.webp',
    reseñas: [4, 3, 4, 4],
    descripcion: 'Protector bucal deportivo de alta calidad, diseñado para brindar máxima protección durante la práctica de deportes de contacto. Ajuste cómodo y seguro.'
  },
];

function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosMostrados, setProductosMostrados] = useState(productos); 
  const [menuAbierto, setMenuAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Alert.alert('✅ Producto agregado', `${producto.nombre} ha sido agregado al carrito.`);
  };

  const handleSearch = () => {
    const filtered = productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosMostrados(filtered);
  };

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuAbierto(!menuAbierto)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>UC Sneakers</Text>
      </View>

      {/* Menú lateral */}
      {menuAbierto && (
        <View style={styles.menuLateral}>
          <View style={{ marginTop: 100 }}>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setMenuAbierto(false);
              navigation.navigate('Carrito', { carrito, setCarrito });
            }}>
              <Text style={styles.menuItem}>🛒 Ir al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuCerrar}>✖️ Cerrar menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={{ marginBottom: 60 }}>
        {/* Buscador y Botón de Búsqueda */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="🔍 Buscar productos..."
            value={busqueda}
            onChangeText={setBusqueda}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Productos destacados */}
        <Text style={styles.subtitulo}>🔥 Productos destacados</Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.destacadoCard}
            >
              <Image source={{ uri: item.imagen }} style={styles.imagenDestacada} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Todos los productos */}
        <Text style={styles.subtitulo}>Todos los productos</Text>
        <FlatList
          data={productosMostrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.card}
            >
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Botón flotante carrito */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Carrito', { carrito, setCarrito })}
          style={styles.botonIrCarrito}
        >
          <Text style={styles.textoBoton}>🛒 Ver carrito ({carrito.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarritoScreen({ route, navigation }) {
  const { carrito, setCarrito } = route.params;

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    Alert.alert('🗑️ Producto eliminado');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>🛒 Carrito</Text>
      <ScrollView style={{ marginBottom: 60 }}>
        {carrito.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>El carrito está vacío.</Text>
        ) : (
          carrito.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => eliminarDelCarrito(index)}
                style={[styles.botonAgregar, { backgroundColor: 'red' }]}
              >
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.carrito}>
          <Text>🧾 Artículos: {carrito.length}</Text>
          <Text>💰 Total: ${total.toFixed(2)}</Text>
        </View>
      </ScrollView>

      {/* Botón flotante Comprar */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pago', { total })}
          style={[styles.botonIrCarrito, { backgroundColor: '#28a745' }]}
        >
          <Text style={styles.textoBoton}>💳 Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PagoScreen({ route }) {
  const { total } = route.params;

  const confirmPago = (metodo) => {
    Alert.alert(`Quieres confirmar el pago por $${total.toFixed(2)} con ${metodo}.`)
  };
  const confirmarPago = (metodo) => {
          Alert.alert('✅ Pago confirmado', `Has pagado $${total.toFixed(2)} con ${metodo}. ¡Gracias por tu compra!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>💳 Opciones de pago</Text>
      <TouchableOpacity onPress={() => confirmarPago('Tarjeta de crédito')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Tarjeta de crédito</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('PayPal')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('Transferencia bancaria')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Transferencia bancaria</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetalleProductoScreen({ route }) {
  const { producto, agregarAlCarrito } = route.params;

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>{producto.nombre}</Text>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>💲 {producto.precio.toFixed(2)}</Text>
      <Text style={{ marginBottom: 10 }}>{producto.descripcion}</Text>
      <Text style={styles.subtitulo}>⭐ Reseñas</Text>
      <View style={styles.estrellas}>
        {Array(promedioEstrellas(producto.reseñas))
          .fill()
          .map((_, i) => (
            <Text key={i}>⭐</Text>
          ))}
      </View>
      <View style={{ marginBottom: 20 }}>
        {producto.reseñas.map((r, index) => (
          <Text key={index}>⭐ {r} estrellas - ¡Muy buen producto!</Text>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => agregarAlCarrito(producto)}
        style={[styles.botonAgregar, { backgroundColor: '#28a745' }]}
      >
        <Text style={{ color: '#fff' }}>🛒 Agregar al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Pago" component={PagoScreen} />
        <Stack.Screen name="Detalle" component={DetalleProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: StatusBar.currentHeight || 40,
    height: 60 + (StatusBar.currentHeight || 40),
    backgroundColor: '#9a9ea2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    elevation: 5,
    zIndex: 1000,
  },
  menuIcon: {
    fontSize: 28,
    position: 'absolute', 
    left: -100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 100, 
  },
  input: {
    flex: 1, 
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#9a9ea2',
    borderRadius: 5,
    elevation: 2,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 5,
  },
  imagenDestacada: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  nombre: {
    fontWeight: 'bold',
  },
  botonAgregar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carrito: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 10,
  },
  botonFijo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  botonIrCarrito: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  destacadoCard: {
    padding: 10,
    marginRight: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    elevation: 2,
    width: 140,
  },
  menuLateral: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 999,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  menuCerrar: {
    fontSize: 16,
    color: 'red',
  },
  estrellas: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});
