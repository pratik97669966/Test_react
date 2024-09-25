import * as React from 'react';
import { AbacProvider, AllowedTo } from 'react-abac';

interface User {
    uuid: string;
    roles: Role[];
    permissions: permissions[];
}

// an object with all permissions
enum permissions {
    EDIT_POST = 'EDIT_POST',
    SYMPTOMS_MENU = 'SYMPTOMS_MENU'
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

// rules describing what roles have what permissions
const rules = {
  [Role.ADMIN]: {
    [permissions.EDIT_POST]: true,
  },
  [Role.USER]: {
    // an abac rule
    // user can only edit the post if it is the owner of it
    // [permissions.EDIT_POST]: (post, user) => post.owner === user.uuid,
  },
};
