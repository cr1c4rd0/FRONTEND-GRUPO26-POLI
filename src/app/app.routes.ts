import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SYNAPSE.TECH | Periódico Digital de Noticias Tecnológicas' },
  { path: 'detalle/:id', component: DetailComponent, title: 'Detalle de Noticia | SYNAPSE.TECH' },
  { path: 'detalle', component: DetailComponent, title: 'Detalle de Noticia | SYNAPSE.TECH' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Noticias Favoritas | SYNAPSE.TECH' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto | SYNAPSE.TECH' },
  { path: 'admin', component: AdminComponent, title: 'Gestión de Noticias (CRUD) | SYNAPSE.TECH' },
  { path: 'perfil', component: ProfileComponent, title: 'Perfil de Usuario | SYNAPSE.TECH' },
  { path: '**', redirectTo: '' }
];
