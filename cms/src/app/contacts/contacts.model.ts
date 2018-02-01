export class Contact {
  public contactId: string;
  public name: string;
  public email: string;
  public phone: string;
  public imgUrl: string;
  public group: Array<Contact>;

  constructor(contactId: string, 
              name: string, 
              email: string, 
              phone: string, 
              imgUrl: string,
              group: Array<Contact>) {
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imgUrl = imgUrl;
    this.group = group;
  }
}