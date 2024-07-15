using { ust.reuse as reuse } from './reuse';
using { cuid, managed, temporal } from '@sap/cds/common';


namespace ust.demo;

context master {
    entity student : reuse.address {
        key id : String(32);
        firstName : String(60);
        lastName : String(60);
        age : Int16;
        class : Association to semester;
    }

    entity semester {
        key id:reuse.guide;
        name :String(30);
        specialization:String(30);
        hod: String(30)
    }

    entity books {
        key code:String(30);
        name :localized String(80);
        author:String(50);
    }
}

context transaction {
    
    entity books:cuid, managed, temporal {
        student:Association to master.student;
        book : Association to master.books;
        
    }
}


