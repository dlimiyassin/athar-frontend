import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { StudentService } from './../../../core/services/student.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../../zBase/security/service/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
            <ul class="layout-menu">
                <ng-container>
                    <ng-container *ngFor="let item of model; let i = index">
                        <li app-menuitem
                            *ngIf="!item.separator"
                            [item]="item"
                            [index]="i"
                            [root]="true">
                        </li>

                        <li *ngIf="item.separator" class="menu-separator"></li>
                    </ng-container>
                </ng-container>
            </ul>

    `
})
export class AppMenu {
    model: MenuItem[] = [];
    modelAdmin: MenuItem[] = [];
    modelTeacher: MenuItem[] = [];
    modelStudent: MenuItem[] = [];



    constructor( private authService: AuthService, private studentService: StudentService) {
        this.initializeMenu()
    }

    ngOnInit() {
       
        this.checkAuthentication();
        this.initializeMenu();


    }

        checkAuthentication() {
        if (this.authService.authenticated) {
            this.initializeMenu()
        }
    }

    initializeMenu() {
        this.modelAdmin = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/admin/view/'] }]
            },
            {
                label: 'Teachers',
                items: [
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/admin/view/teacher-list'] },
                ]
            },
            {
                label: 'Students',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/app/admin/view/students-list']
                    }
                ]
            },
            {
                label: 'Surveys',
                items: [
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/admin/view/surveys'] },
                    { label: 'Answers', icon: 'pi pi-fw pi-send', routerLink: ['/app/admin/view/surveys/students-answers'] },
                    { label: 'Create', icon: 'pi pi-fw pi-plus', routerLink: ['/app/admin/view/surveys/create'] },
                ]
            },
            {
                label: 'Configuration',
                items: [
                    {
                        label: 'Registeration Form',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/app/admin/view/config/academic-fields']
                        
                    },
                    {
                        label: 'Importing Data',
                        icon: 'pi pi-fw pi-file-import',
                        items: [                            
                            {
                                label: 'Prediction Types',
                                icon: 'pi pi-fw pi-microchip-ai',
                                routerLink: ['/app/admin/view/config/prediction-types']
                            },
                            {
                                label: 'Future fields',
                                icon: 'pi pi-fw pi-chart-line',
                                routerLink: ['/app/admin/view/config/future-fields']
                            }
                        ]
                    }
                ]
            },
        ];
        
        this.modelTeacher = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/teacher/view/'] }]
            },
                        {
                label: 'Students',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/app/teacher/view/students-list']
                    }
                ]
            },
            {
                label: 'Surveys',
                items: [
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/teacher/view/surveys'] },                    
                    { label: 'Answers', icon: 'pi pi-fw pi-send', routerLink: ['/app/teacher/view/surveys/students-answers']},
                    { label: 'Create', icon: 'pi pi-fw pi-plus', routerLink: ['/app/teacher/view/surveys/create'] },
                ]
            },
            {
                label: 'Export / Import',
                items: [{ label: 'Export / Import', icon: 'pi pi-fw pi-download', routerLink: ['/app/teacher/view/export-import'] }]
            }
        ];

        this.modelStudent = [
            // {
            //     label: 'Home',
            //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/student/view/'] }]
            // },
            {
                label: 'Surveys',
                items: [
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/student/view/surveys'] },
                    { label: 'Answered Surveys', icon: 'pi pi-fw pi-send', routerLink: ['/app/student/view/answers'] },
                     { label: 'Recommandation', icon: 'pi pi-fw pi-bolt', routerLink: ['/app/student/view/recommandation'] },
                ]
            }
        ];

        
        if (this.authService.authenticatedUser.roleDtos) {

            for (let i = 0; i < this.authService.authenticatedUser.roleDtos.length; i++) {
                const role = this.authService.authenticatedUser.roleDtos[i].toString();
                if (role === 'ROLE_ADMIN' && this.authService.isAdmin === true) {
                    this.model = this.modelAdmin;
                } else if (role === 'ROLE_TEACHER' && this.authService.isTeacher === true) {
                    this.model = this.modelTeacher;
                } else if (role === 'ROLE_STUDENT' && this.authService.isStudent === true) {
                    this.model = this.modelStudent;
                }   
            }
        }

    }


}
