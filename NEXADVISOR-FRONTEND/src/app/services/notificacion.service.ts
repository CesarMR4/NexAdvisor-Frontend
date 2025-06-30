import { Injectable } from '@angular/core';
import { Client, Message, over } from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private stompClient: Client | null = null;

  conectar(idAsesor: number, callback: (mensaje: string) => void): void {
    const socket = new SockJS('http://localhost:8080/ws');  
   //const socket = new SockJS(`${environment.apiUrl}/ws`);
    this.stompClient = over(socket);

    this.stompClient.connect({}, () => {
      // Suscribirse al canal de notificaciones
      this.stompClient?.subscribe(`/notificacion/reservas/${idAsesor}`, (mensaje: Message) => {
        const cuerpo = JSON.parse(mensaje.body);
        callback(cuerpo.mensaje);
      });
    });
  }

  desconectar(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {
        console.log('Desconectado del WebSocket');
      });
    }
  }
}
