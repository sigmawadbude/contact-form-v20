import { computed, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { httpResource, HttpResourceRef } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private AllContactsresource: HttpResourceRef<Contact[] | undefined> = httpResource(() => '/api/contacts')

  getAllContacts() {
    return computed(() => this.AllContactsresource.value() ?? []);
  }
}
